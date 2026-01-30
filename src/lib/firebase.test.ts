import { describe, it, expect } from 'bun:test';
import { app, db } from './firebase';

describe('Firebase Initialization', () => {
  it('should initialize the Firebase app', () => {
    expect(app).toBeDefined();
    expect(app.name).toBe('[DEFAULT]');
  });

  it('should initialize Firestore', () => {
    expect(db).toBeDefined();
    expect(db.type).toBe('firestore');
  });
});
