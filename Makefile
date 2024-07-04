NAME := ft_trans
COMPOSE := docker compose

up:
	$(COMPOSE) up --build

down:
	$(COMPOSE) down

.PHONY: up down
