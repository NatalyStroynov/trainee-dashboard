# 🧑‍🎓 Trainee Dashboard

A web-based dashboard to manage, filter, and visualize trainee performance. Built with Angular standalone components, signals, and Material UI.

## 🚀 Features

- 📄 Data table with pagination and filtering
- 🔍 Filter by name, ID, subject, grade, and date
- 📊 Charts for performance analysis (IDs and Subjects)
- 🧪 Unit tests using Jasmine and Karma
- 🧩 Modular component-based architecture
- 🧼 Clear state management using Angular signals

## 🛠 Tech Stack

- Angular 17+
- Standalone Components
- Angular Signals
- TypeScript
- Angular Material
- RxJS
- Jasmine + Karma (for unit tests)

## 📁 Project Structure

```
src/
├── app/
│   ├── features/
│   │   ├── data-page/              # Main data view
│   │   ├── monitor-page/           # Monitor with aggregate stats
│   │   └── toggle-demo/            # Toggle showcase
│   ├── services/
│   │   ├── trainee-state.service.ts        # Central state for data-page
│   │   └── monitor-state.service.ts        # Aggregated state logic
│   ├── models/                    # Data models
│   ├── mocks/                     # Mock data (MOCK_TRAINEES)
│   ├── app.routes.ts             # App routes
│   └── app.component.ts          # Root component
```

## 🧪 Running Tests

```bash
ng test
```

Make sure you have `@types/jasmine` installed. If you see an error like `Cannot find name 'describe'`, run:

```bash
npm install --save-dev @types/jasmine
```

## 🖥️ Development Server

```bash
ng serve
```

Navigate to: [http://localhost:4200](http://localhost:4200)

## 📦 Build

```bash
ng build
```

Compiled files will be in the `dist/` directory.

## ✍️ How to Add a Test

To add a spec file manually:

```bash
ng generate service services/my-service --skip-tests=false
```

Or create it by hand next to the service:

```ts
// my-service.service.spec.ts
describe('MyService', () => {
  it('should create service', () => {
    expect(true).toBeTrue();
  });
});
```

## 📌 Notes

- Signals are used for state (no NgRx or global store)
- Pagination resets automatically on filter change
- Trainees are loaded from mock data (`MOCK_TRAINEES`)

## 📄 License

MIT