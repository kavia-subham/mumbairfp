# PUBLIC_INTERFACE
def normalize_language(lang: str) -> str:
    """Normalize language codes and provide defaults."""
    if not lang:
        return "en"
    return lang.lower().strip()
