SHELL=/usr/bin/env bash

include .env

# All
.PHONY: build
build:
	@docker compose build

.PHONY: up
up:
	@docker compose up -d

.PHONY: down
down:
	@docker compose down

.PHONY: init
init:
ifeq (${ENV},production)
	@$(MAKE) init.production
else ifeq (${ENV},develop)
	@$(MAKE) init.develop
endif

.PHONY: init.develop
init.develop:
	@$(MAKE) frontend.init.develop
	@$(MAKE) down

.PHONY: init.production
init.production:
	@$(MAKE) frontend.init.production
	@$(MAKE) down

# Frontend
.PHONY: frontend.init.develop
frontend.init.develop:
	@docker compose run --rm frontend su node -c "cp .env.local.example .env.local"
	@docker compose run --rm frontend su node -c "sed -i s/%API_APP_ID%/${FRONTEND_API_APP_ID}/ .env.local"
	@docker compose run --rm frontend su node -c "npm ci"

.PHONY: frontend.init.production
frontend.init.production:
	@docker compose run --rm frontend cp .env.local.example .env.local
	@docker compose run --rm frontend sed -i s/%API_APP_ID%/${FRONTEND_API_APP_ID}/ .env.local
	@docker compose run --rm frontend npm ci
	@docker compose run --rm frontend npm run build
