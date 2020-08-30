default:
	tmux \
		new-session 'cd client && yarn install && yarn start' \; \
		split-window 'cd event-bus && npm install && npm start' \; \
		split-window 'cd comments && npm install && npm start' \; \
		split-window 'cd posts && npm install && npm start' \; \
		split-window 'cd query && npm install && npm start' \; \
		split-window -h 'cd moderation && npm install && npm start' \; \
		selectl tiled \; \
		set pane-border-status top \; \
		set -g pane-border-format "#P: #{b:pane_current_path}"

