SHELL=/usr/bin/env bash

# All
build:
	@docker compose build

up:
	@docker compose up -d

down:
	@docker compose down

init:
	@$(MAKE) frontend.init

# Frontend
frontend.init:
	@docker compose run --rm frontend su node -c "npm ci"
