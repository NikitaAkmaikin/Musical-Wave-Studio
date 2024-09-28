src/
│
├── app/ # Главные файлы и настройки приложения (router, providers)
│ ├── App.tsx
│ └── index.tsx
│
├── components/ # Переиспользуемые UI-компоненты
│ ├── contactForm/ # Компонент формы контактов
│ ├── footer/ # Компонент футера
│ ├── musicCard
│ ├── SubscriptionCard
│ ├── modal/ # Модальные окна
│ ├── navbar/ # Навигационная панель
│ └── ui/ # UI-компоненты (например, карточки)
│
├── pages/ # Страницы приложения
│ ├── adminDashboard/
│ ├── contact/
│ ├── home/
│ ├── login/
│ ├── musicDirections/
│ └── subscriptions/
│ └── not-fount-404
│
├── services/ # Логика работы с состоянием или API
│ ├── store/ # Состояние приложения (например, MobX)
│ │ ├── AuthStore.ts
│ │ ├── MusicStore.ts
│ │ └── SubscriptionStore.ts
│ └── root-store-context.ts # Контекст состояния
│
└── utils/ # Вспомогательные функции (утилиты)
└── formatDate.ts
