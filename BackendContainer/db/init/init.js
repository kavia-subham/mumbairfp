'use strict';

/**
 * MongoDB initialization script for Maharashtra AI Agents Platform
 * Collections:
 *  - users
 *  - conversations
 *  - schemes
 *  - vector_embeddings
 *  - audit_logs
 *
 * Usage:
 *   mongosh "<MONGODB_URI>/<MONGODB_DB_NAME>" --file mumbairfp/BackendContainer/db/init/init.js
 *
 * Notes:
 * - The script is idempotent for collections creation and indexes (createIndex is safe if already exists).
 * - Ensure you replace environment placeholders in the command or export variables before running.
 */

// Helper to safely create a collection with validator if it doesn't exist
function ensureCollection(name, options) {
  const exists = db.getCollectionNames().includes(name);
  if (!exists) {
    db.createCollection(name, options);
    print(`Created collection: ${name}`);
  } else if (options && options.validator) {
    // Try applying validator to existing collection
    try {
      db.runCommand({ collMod: name, validator: options.validator });
      print(`Updated validator for existing collection: ${name}`);
    } catch (e) {
      print(`Warning: Could not update validator for ${name}: ${e.message}`);
    }
  } else {
    print(`Collection already exists: ${name}`);
  }
}

// users
ensureCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'language', 'created_at'],
      properties: {
        username: { bsonType: 'string', description: 'Unique username for the user' },
        preferences: { bsonType: 'object', description: 'User preferences object', additionalProperties: true },
        language: { bsonType: 'string', description: 'Preferred language code (e.g., en, hi, mr)' },
        created_at: { bsonType: 'date', description: 'ISO date of creation' }
      },
      additionalProperties: true
    }
  }
});

// conversations
ensureCollection('conversations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['user_id', 'channel', 'messages', 'language', 'timestamp'],
      properties: {
        user_id: { bsonType: 'objectId', description: 'Reference to users._id' },
        channel: { bsonType: 'string', description: 'Source channel (web, whatsapp, voice, chat)' },
        messages: { bsonType: 'array', description: 'Ordered list of messages in conversation' },
        language: { bsonType: 'string', description: 'Conversation language' },
        timestamp: { bsonType: 'date', description: 'Conversation creation timestamp' }
      },
      additionalProperties: true
    }
  }
});

// schemes
ensureCollection('schemes', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'description', 'eligibility', 'process', 'updated_at'],
      properties: {
        title: { bsonType: 'string', description: 'Scheme title' },
        description: { bsonType: 'object', description: 'Localized descriptions keyed by language', additionalProperties: true },
        eligibility: { bsonType: 'object', description: 'Eligibility criteria object', additionalProperties: true },
        process: { bsonType: 'array', description: 'List of process steps' },
        updated_at: { bsonType: 'date', description: 'Last update timestamp' }
      },
      additionalProperties: true
    }
  }
});

// vector_embeddings
ensureCollection('vector_embeddings', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['content_id', 'embedding', 'metadata'],
      properties: {
        content_id: { bsonType: 'objectId', description: 'Reference to a content document (e.g., scheme or doc)' },
        embedding: { bsonType: 'array', items: { bsonType: 'double' }, description: 'Vector embedding numbers' },
        metadata: { bsonType: 'object', description: 'Metadata about the embedding', additionalProperties: true }
      },
      additionalProperties: true
    }
  }
});

// audit_logs
ensureCollection('audit_logs', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['user_id', 'action', 'details', 'timestamp'],
      properties: {
        user_id: { bsonType: 'objectId', description: 'User performing the action' },
        action: { bsonType: 'string', description: 'Action name or type' },
        details: { bsonType: 'object', description: 'Details payload for the audit entry', additionalProperties: true },
        timestamp: { bsonType: 'date', description: 'When the action occurred' }
      },
      additionalProperties: true
    }
  }
});

// Indexes
db.users.createIndex({ username: 1 }, { unique: true, name: 'idx_users_username_unique' });

db.conversations.createIndex({ user_id: 1 }, { name: 'idx_conversations_user_id' });
db.conversations.createIndex({ timestamp: 1 }, { name: 'idx_conversations_timestamp' });

db.schemes.createIndex({ title: 'text' }, { name: 'idx_schemes_title_text' });

db.vector_embeddings.createIndex({ content_id: 1 }, { unique: true, name: 'idx_vector_embeddings_content_unique' });

db.audit_logs.createIndex({ user_id: 1 }, { name: 'idx_audit_logs_user_id' });
db.audit_logs.createIndex({ timestamp: 1 }, { name: 'idx_audit_logs_timestamp' });

print('MongoDB initialization completed.');
