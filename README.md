# rails-log-viewer
view / filter rails log with one command

# Example
```bash
# (node / npx) app.js <filename> <text_keyword>

# use direct node
node app.js production.log "500 Internal Server Error"

# use npx
npx rails-log-viewer production.log "500 Internal Server Error"
```
