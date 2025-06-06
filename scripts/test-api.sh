#!/bin/bash

# Test script to verify the API endpoints work correctly

BASE_URL="http://localhost:8080/api/v1"

echo "Testing Poker Mentor API..."

# Test 1: Create a session
echo "1. Creating a new session..."
SESSION_RESPONSE=$(curl -s -X POST "$BASE_URL/sessions" \
  -H "Content-Type: application/json" \
  -d '{
    "gameType": "CASH",
    "stakes": "$2/$5",
    "duration": 180,
    "performanceGrade": "B",
    "mentalState": "Focused but tired",
    "energyLevel": 3,
    "profit": 340.50
  }')

echo "Session created: $SESSION_RESPONSE"

# Extract session ID
SESSION_ID=$(echo $SESSION_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Session ID: $SESSION_ID"

if [ -z "$SESSION_ID" ]; then
    echo "Failed to create session. Exiting."
    exit 1
fi

# Test 2: Get the session
echo -e "\n2. Retrieving the session..."
curl -s "$BASE_URL/sessions/$SESSION_ID" | jq '.'

# Test 3: Add a hand to the session
echo -e "\n3. Adding a hand to the session..."
HAND_RESPONSE=$(curl -s -X POST "$BASE_URL/sessions/$SESSION_ID/hands" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "AK vs tight player 3-bet, missed flop",
    "initialThought": "Should I c-bet or give up?",
    "adaptiveThought": "Consider board texture and opponent range",
    "spotType": "3BET",
    "priority": "HIGH"
  }')

echo "Hand added: $HAND_RESPONSE"

# Test 4: Get hands for the session
echo -e "\n4. Retrieving hands for the session..."
curl -s "$BASE_URL/sessions/$SESSION_ID/hands" | jq '.'

# Test 5: Get all sessions
echo -e "\n5. Retrieving all sessions..."
curl -s "$BASE_URL/sessions?page=0&size=10" | jq '.'

echo -e "\nAPI testing completed!"