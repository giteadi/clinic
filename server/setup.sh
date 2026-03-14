#!/bin/bash

echo "🏥 Setting up Clinic SaaS Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your database credentials"
fi

# Create database if it doesn't exist
echo "🗄️ Creating database..."
mysql -u root -e "CREATE DATABASE IF NOT EXISTS clinic_saas;" 2>/dev/null || echo "Database already exists or requires password"

# Run migrations
echo "🔨 Running database migrations..."
node config/migrations.js

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the server:"
echo "   npm run dev"
echo ""
echo "🌐 To test in production:"
echo "   npm start"
echo ""
echo "📊 API will be available at: http://localhost:5000"
echo "🏥 Test with: http://citydental.localhost:5000"
