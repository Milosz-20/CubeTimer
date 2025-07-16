#!/usr/bin/env pwsh

Write-Host "Stopping test database..."
& "C:\Program Files\Docker\Docker\resources\bin\docker.exe" compose down test-db

Write-Host "Starting test database..."
& "C:\Program Files\Docker\Docker\resources\bin\docker.exe" compose up test-db -d

Write-Host "Waiting for database to be ready..."
Start-Sleep -Seconds 5

Write-Host "Deploying migrations..."
& bunx dotenv -e .env.test -- prisma migrate deploy

Write-Host "Test database is ready!"
