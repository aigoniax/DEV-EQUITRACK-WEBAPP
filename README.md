# EquiTrack WebApp

A modern web application frontend for tracking personal income and expenses, built with React and Vite. This is the client-side application that connects to the EquiTrack Backend.

## Features

- 🔐 User authentication (Register/Login)
- 💰 Add and manage income transactions
- 💸 Track expenses with categories
- 📊 Interactive dashboard with charts and visualizations
- 📝 Transaction history with filtering
- 💼 Budget tracking and management
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with Tailwind CSS

## Technology Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router
- **Charts:** Recharts / Chart.js
- **State Management:** React Hooks

## Prerequisites

Before running this application, make sure you have:

- Node.js 16+ installed
- npm or yarn package manager
- EquiTrack Backend running on `http://localhost:8080`

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/equitrack-frontend.git
cd equitrack-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Project Structure

```
equitrack-frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API service calls
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite configuration
```

## Usage

### 1. Register/Login

- Create a new account or login with existing credentials
- Authentication tokens are stored securely

### 2. Add Transactions

- Navigate to "Add Transaction"
- Select transaction type (Income/Expense)
- Enter amount, category, and description
- Submit to save

### 3. View Dashboard

- See your financial overview
- View charts showing spending patterns
- Check budget progress
- Monitor recent transactions

### 4. Manage Budget

- Set monthly budgets for different categories
- Track spending against budgets
- Receive alerts when approaching limits

## API Integration

This frontend connects to the EquiTrack Backend API. Make sure the backend is running before starting the frontend application.

- **Backend Repository:** [EquiTrack Backend](https://github.com/yourusername/equitrack-backend)
- **Default API Endpoint:** `http://localhost:8080/api`

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Deployment

### Deploy to Vercel/Netlify

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting service
3. Update environment variables with production API URL

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Related Projects

- [EquiTrack Backend](https://github.com/yourusername/equitrack-backend) - Spring Boot backend API

## Support

For issues or questions, please open an issue on [GitHub](https://github.com/yourusername/equitrack-frontend/issues).
