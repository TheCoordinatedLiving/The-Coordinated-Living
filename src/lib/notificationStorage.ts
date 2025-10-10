// Simple in-memory storage for push notification subscriptions
// In production, this should be replaced with a database

interface Subscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  subscribedAt: string;
}

class NotificationStorage {
  private subscriptions: Subscription[] = [];

  addSubscription(subscription: Subscription): void {
    // Check if subscription already exists
    const existingIndex = this.subscriptions.findIndex(
      sub => sub.endpoint === subscription.endpoint
    );

    if (existingIndex >= 0) {
      // Update existing subscription
      this.subscriptions[existingIndex] = subscription;
    } else {
      // Add new subscription
      this.subscriptions.push(subscription);
    }

    console.log(`Subscription added. Total subscriptions: ${this.subscriptions.length}`);
  }

  removeSubscription(endpoint: string): void {
    this.subscriptions = this.subscriptions.filter(sub => sub.endpoint !== endpoint);
    console.log(`Subscription removed. Total subscriptions: ${this.subscriptions.length}`);
  }

  getAllSubscriptions(): Subscription[] {
    return [...this.subscriptions];
  }

  getSubscriptionCount(): number {
    return this.subscriptions.length;
  }

  clearSubscriptions(): void {
    this.subscriptions = [];
    console.log('All subscriptions cleared');
  }
}

// Export a singleton instance
export const notificationStorage = new NotificationStorage();
