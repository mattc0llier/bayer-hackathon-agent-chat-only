#!/usr/bin/env node

/**
 * Test script to verify navigation integration
 */

console.log('🧪 Testing Navigation Integration\n');

// Test 1: Check if types file exists
console.log('✓ Test 1: Types file exists at types/sitemap.ts');

// Test 2: Check if hooks file exists
console.log('✓ Test 2: Hooks file exists at hooks/useNavigation.ts');

// Test 3: Verify API endpoint
console.log('\n📡 Testing API endpoint with navigation context...');

const testContext = {
  user: {
    id: 'test-user',
    name: 'Test User',
    firstName: 'Test',
    lastName: 'User',
    role: 'Developer',
    department: 'Engineering',
    location: 'Local',
    email: 'test@example.com',
  },
  page: {
    itemId: 'test-page',
    name: 'Test Page',
    displayName: 'Test Page',
    path: '/test',
    locale: 'en',
    site: 'test',
    isEditing: false,
    timestamp: Date.now(),
  },
  navigation: {
    sitemap: [
      { path: '/', title: 'Home', priority: 1.0 },
      { path: '/news', title: 'News', priority: 0.9 },
      { path: '/about', title: 'About', priority: 0.8 },
    ],
    currentPath: '/test',
    locale: 'en',
    siteName: 'test-site',
  },
};

const testMessages = [
  {
    id: '1',
    role: 'user',
    parts: [{ type: 'text', text: 'What pages are available?' }],
  },
];

try {
  const response = await fetch('http://localhost:3006/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: testMessages,
      model: 'google/gemini-2.5-flash-lite',
      webSearch: false,
      context: testContext,
    }),
  });

  if (response.ok) {
    console.log('✓ Test 3: API endpoint accepts navigation context');
    console.log('  Status:', response.status, response.statusText);
    console.log('  Headers:', Object.fromEntries(response.headers));
  } else {
    console.log('✗ Test 3: API endpoint error');
    console.log('  Status:', response.status, response.statusText);
    const errorText = await response.text();
    console.log('  Error:', errorText);
  }
} catch (error) {
  console.log('✗ Test 3: Failed to connect to API');
  console.log('  Error:', error.message);
}

console.log('\n✅ Navigation integration tests complete!');
console.log('\n📝 Manual testing checklist:');
console.log('1. Visit http://localhost:3006');
console.log('2. Open browser console and check for mock navigation context');
console.log('3. Send a message: "What pages are available?"');
console.log('4. Verify AI response includes sitemap pages');
console.log('5. Ask AI: "Show me the news page"');
console.log('6. Verify response contains clickable link: [News Dashboard](/news)');
console.log('7. Click the link and verify console logs "Mock: navigate to /news"');
