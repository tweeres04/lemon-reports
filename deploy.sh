ssh server -T <<'EOL'
	cd lemon-reports && \
	git fetch && git reset --hard origin/main && \
	docker compose up --build -d
EOL
