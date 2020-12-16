HOST="127.0.0.1"
PORT=8000


.PHONY: run
run:
	cd src/backend && uvicorn main:app --reload --host=$(HOST) --port=$(PORT)

.PHONY: run-interface
run-interface:
	cd src/frontend && npm start

.PHONY: compile-npm
compile-npm:
	cd src/frontend && npm install

.PHONY: compile-requirements
compile-requirements:
	pip install -r lint-requirements.txt
	pip install -r requirements.txt

.PHONY: freeze-requirements
freeze-requirements:
	pip freeze > requirements.txt

.PHONY: lint-backend
lint-backend:
	isort --recursive src/backend
	black src/backend

.PHONY: lint-frontend
lint-frontend:
	cd src/frontend && npm run lint

.PHONY: migrate
migrate:
	cd src/backend && alembic upgrade head

.PHONY: revision
revision:
	cd src/backend && alembic revision --autogenerate -m "$(MESSAGE)"

.PHONY: lint
lint: lint-backend lint-frontend

.PHONY: setup
setup: compile-requirements compile-npm


