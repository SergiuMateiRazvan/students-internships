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

.PHONY: lint-censor
lint-censor:
	isort --recursive src/censor
	black src/censor

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
lint: lint-backend lint-frontend lint-censor

.PHONY: setup
setup: compile-requirements compile-npm


.PHONY: build
build: build-moderation
	docker-compose build students-internships
	docker-compose build interface
	docker-compose build censor
	docker-compose build rabbitmq


.PHONY: wakeup-database
wakeup-database:
	docker-compose up -d db
	@echo "==="
	@echo "Sleeping for a few seconds to make sure the database wakes up!"
	@echo "==="
	sleep 3s

.PHONY: docker-clean
docker-clean: docker-clean-containers docker-clean-images

docker-clean-images:
	docker images -q -f="dangling=true" | xargs docker rmi

docker-clean-containers:
	docker ps -aq | xargs docker rm -f

.PHONY: compose-service
compose-service:
	docker-compose up students-internships

.PHONY: compose-interface
compose-interface:
	docker-compose up interface

.PHONY: compose-censor
compose-censor:
	docker-compose up censor

.PHONY: compose-rabbit
compose-rabbit:
	docker-compose up rabbitmq

.PHONY: compose-mb
compose-mb:
	docker-compose up moderation_backend

.PHONY: compose-mf
compose-mf:
	docker-compose up moderation_frontend

.PHONY: build-moderation
build-moderation: build-mb build-mf

.PHONY: build-mf
build-mf:
	docker-compose build moderation_frontend

.PHONY: build-mb
build-mb:
	docker-compose build moderation_backend

.PHONY: compose-redis
compose-redis:
	docker-compose up redis
