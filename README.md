# react-express-boilerplate — frontend part

Одностраничное React-приложение для работы с элементами (ids): слева — список всех элементов, справа — список выбранных. Поддерживаются фильтрация, бесконечная прокрутка, добавление элементов через очередь на бэкенде и уведомления в реальном времени по SSE.

## Стек

| Категория | Технологии |
| --- | --- |
| Язык и фреймворк | TypeScript, React 19 |
| Сборка | Vite 8 |
| Состояние | Redux Toolkit, RTK Query, react-redux |
| HTTP | Axios (кастомный `baseQuery` для RTK Query) |
| UI | CSS Modules, react-toastify, react-intersection-observer |
| Инструменты | ESLint, Prettier, `@rtk-query/codegen-openapi` |

## Возможности

- **Два столбца** — «доступные» и «выбранные» элементы, синхронизируются между собой через общий флаг рефетча.
- **Бесконечная прокрутка** — подгрузка следующей страницы, когда sentinel-элемент попадает в зону видимости (`react-intersection-observer`, `rootMargin: 300px`).
- **Фильтрация по id** — поддерживается одиночный id, диапазон (`1-12`) и список (`1,2,12`) в одной строке.
- **Выбор / снятие элемента** — `PUT /api/items` меняет `isChosen`, после чего список выбранных автоматически перезапрашивается.
- **Добавление элемента** — `POST /api/items` ставит элемент в очередь; когда бэкенд «прогоняет» очередь, он отправляет SSE-событие `flushed`, и приложение предлагает обновить список.
- **Уведомления** — успешные и ошибочные операции показываются тостами; ошибки HTTP-запросов обрабатываются глобальным интерцептором Axios.
- **Тёмная тема** — оформление на CSS-переменных (`src/styles/variables`).

## Требования

- Node.js 20.19+ или 22.12+
- запущенный бэкенд с API и Swagger-спекой (по умолчанию `http://localhost:3000`)

## Быстрый старт

```bash
npm ci
npm run dev
```

Открыть <http://localhost:5173>.

Переменная окружения задаётся в `.env.development`:

```bash
VITE_API_URL = http://localhost:3000/api
```

В режиме разработки Vite проксирует запросы `/api/*` на `VITE_API_URL`. В production-сборке запросы идут на относительный путь `/api/...`, поэтому на сервере должен быть настроен reverse-proxy на бэкенд.

## Скрипты

| Команда | Описание |
| --- | --- |
| `npm run dev` | запуск dev-сервера с HMR |
| `npm run build` | типизация (`tsc -b`) + сборка в `dist/` |
| `npm run preview` | локальный просмотр собранного `dist/` |
| `npm run lint` | проверка ESLint |
| `npm run pretty` | форматирование кода Prettier |
| `npm run generate-api` | регенерация API-слоя из OpenAPI-спеки |

## Структура проекта

```
src/
├── api/                  # слой работы с API
│   ├── api.ts            # сгенерированный RTK Query API (не править вручную)
│   ├── emptyApi.ts       # базовый api без эндпоинтов
│   ├── axios.config.ts   # axios-инстанс, интерцепторы, baseQuery
│   ├── openapi-config.ts # конфиг генерации API
│   └── serverEvents.ts   # подключение SSE (EventSource)
├── components/           # переиспользуемые UI-компоненты
│   ├── Button/  Card/  Column/  ColumnHeader/
│   └── Empty/  Input/  Loader/
├── configs/              # константы (иконки, настройки тостов)
├── pages/
│   └── Home/             # единственная страница
│       ├── components/
│       │   ├── AddItemForm/        # форма добавления элемента
│       │   ├── ChosenItemsColumns/ # правый столбец (выбранные)
│       │   ├── FilterForm/         # фильтр по id
│       │   └── ItemsColumn/        # левый столбец (все элементы)
│       ├── hooks/useItemsColumn.ts # пагинация, скролл, лоадер столбца
│       └── Home.config.ts          # параметры пагинации
├── store/                # Redux: slices, selectors, типизированные хуки
├── styles/               # глобальные стили и CSS-переменные
├── types/                # общие типы (Action, ActionAsync)
└── utils/                # тосты, общие утилиты
```

## Как устроено

### API-слой

- `emptyApi.ts` создаёт RTK Query API с кастомным `axiosBaseQuery` из `axios.config.ts`.
- Интерцептор ответов Axios показывает тосты для всех ошибок: `404` — предупреждение, остальные — ошибка (текст берётся из `error.response.data.error`).
- `src/api/api.ts` **генерируется** из Swagger-спеки (`http://localhost:3000/api-docs/swagger.json`). Не редактируйте его вручную — после изменения бэкенда выполните:

```bash
npm run generate-api
```

- SSE: `src/api/serverEvents.ts` открывает `EventSource('/api/items/events')`; событие `flushed` означает, что очередь созданных элементов обработана и можно перезапрашивать список.

### Состояние (Redux Toolkit)

| Slice | Назначение |
| --- | --- |
| `itemsState` | список всех элементов: построчная подгрузка, фильтрация, переключение `isChosen` |
| `chosenItemsState` | список выбранных элементов: подгрузка, фильтрация, перезапуск, сортировка по `order` |
| `sharedFlagsState` | общий флаг `hasToRefetchChosenItems` — сигнал правому столбцу перезапросить данные |

`api` (RTK Query) подключён в `store.ts` как редьюсер и middleware. Хуки: `useAppDispatch`, `useAppSelector` из `src/store/hooks.ts`.

### Страница Home

- `ItemsColumn` — загружает элементы, фильтрует, переключает `isChosen`, добавляет новые элементы и слушает SSE-событие `flushed`.
- `ChosenItemsColumn` — загружает элементы с фильтром `isChosenFilter: true`, позволяет убрать элемент и реагирует на флаг `hasToRefetchChosenItems`.
- Оба столбца используют хук `useItemsColumn` (пагинация через `paginationRef`, лоадер, `scrollToTop`, intersection observer).

### Компоненты

`Button`, `Card`, `Column`, `ColumnHeader`, `Empty`, `Input`, `Loader` — презентационные компоненты с CSS Modules; `Card` рендерит элемент (`id`, иконки выбора/удаления), `Column` — прокручиваемый контейнер со скроллом, `Loader` управляет видимостью контента и индикатора загрузки.

## API

| Метод | Путь | Назначение |
| --- | --- | --- |
| `GET` | `/api/items` | список элементов: `offset`, `limit`, `itemIdFilter`, `isChosenFilter` |
| `POST` | `/api/items` | создать элемент по `id` (ответ `202`, элемент попадает в очередь) |
| `PUT` | `/api/items` | обновить элемент: `{ id, isChosen, order }` |
| `GET` | `/api/items/{id}` | получить элемент по id |
| `GET` | `/api/items/events` | SSE-поток событий |
| `GET` | `/health` | здоровье сервиса |

`POST` и `PUT` также поддерживают заголовок `Idempotency-Key` (опционально).

## Окружение

| Переменная | Где задаётся | Описание |
| --- | --- | --- |
| `VITE_API_URL` | `.env.development`, `.env.production` | адрес бэкенда, используется dev-прокси Vite |

## Конвенции

- Алиас `@` → `src` (настроен в `tsconfig.app.json` и `vite.config.ts`).
- Prettier: одинарные кавычки, без точек с запятой, отступ 2, длина строки 80.
- Компоненты — функциональные, со своим `index.ts`, `.types.ts` и `.module.css`.
- Стили — только через CSS Modules, дизайн-токены — в `src/styles/variables`.
- Сообщения пользователю — на русском языке.
