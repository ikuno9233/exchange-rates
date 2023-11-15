SHELL=/usr/bin/env bash

include .env

# All
build:
	@docker compose build

up:
	@docker compose up -d

down:
	@docker compose down

init.develop:
	@$(MAKE) frontend.init.develop

init.production:
	@$(MAKE) frontend.init.production

# Frontend
frontend.init.develop:
	@docker compose run --rm frontend su node -c "cp .env.local.example .env.local"
	@docker compose run --rm frontend su node -c "sed -i s/%API_APP_ID%/${FRONTEND_API_APP_ID}/ .env.local"
	@docker compose run --rm frontend su node -c "npm ci"

frontend.init.production:
	@docker compose run --rm frontend cp .env.local.example .env.local
	@docker compose run --rm frontend sed -i s/%API_APP_ID%/${FRONTEND_API_APP_ID}/ .env.local
	@docker compose run --rm frontend npm ci
	@docker compose run --rm frontend npm run build
