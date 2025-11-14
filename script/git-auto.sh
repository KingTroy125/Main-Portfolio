#!/bin/bash
# Simple Git Commit Automation Script with Test & Auto File Tracking

# Ask for commit message
read -p "Enter commit message: " commitMsg

# Run tests if available
if npm run | grep -q "test"; then
  echo "Running npm test..."
  npm test
  if [ $? -ne 0 ]; then
    echo "Tests failed! Commit aborted."
    exit 1
  else
    echo "Tests passed successfully."
  fi
else
  echo "No test script found in package.json."
fi

# Add all changes (handles deleted, moved, and modified files)
echo "Staging all changes..."
git add -A

# Check if there are any staged changes
if git diff --cached --quiet; then
  echo "Everything up-to-date"
else
  # Commit and push
  git commit -m "$commitMsg"
  git push
  echo "Code committed and pushed successfully!"
fi
