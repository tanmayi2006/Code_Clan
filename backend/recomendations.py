import json

# Sample data - List of shows with categories
shows = [
    {"title": "Rock Legends", "category": "Musical Shows"},
    {"title": "Jazz Nights", "category": "Musical Shows"},
    {"title": "Tech Talk Podcast", "category": "Informative Podcasts"},
    {"title": "Alumni Success Stories", "category": "Alumni Talks"},
    {"title": "Nighttime Tales", "category": "Storytelling"},
    {"title": "Blues and Beyond", "category": "Musical Shows"},
    {"title": "Science Insights", "category": "Informative Podcasts"},
    {"title": "From Campus to Corporate", "category": "Alumni Talks"},
    {"title": "Dark Tales Unveiled", "category": "Storytelling"}
]

def recommend_shows(user_preferences):
    """
    Recommends shows based on user-selected categories.
    """
    recommended = [show["title"] for show in shows if show["category"] in user_preferences]

    # If no direct matches, return all shows as fallback
    return recommended if recommended else [show["title"] for show in shows]

# Simulating user preferences (these should be collected during signup)
user_input = input("Enter preferred categories (comma separated): ")
user_preferences = [category.strip() for category in user_input.split(",")]

# Get recommendations
recommendations = recommend_shows(user_preferences)

# Display results
print("\nRecommended Shows:")
print(json.dumps(recommendations, indent=2))
