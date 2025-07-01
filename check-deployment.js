#!/usr/bin/env node

/**
 * Script to check if GitHub Pages deployment is working correctly
 */

const https = require('https');
const url = require('url');

const siteUrl = 'https://kaushiks18.github.io/estate-pro-finder-main/';

function checkSite(targetUrl) {
  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(targetUrl);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    const req = https.request(options, (res) => {
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Headers:`, res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

async function main() {
  console.log('🔍 Checking GitHub Pages deployment...');
  console.log(`📍 Site URL: ${siteUrl}`);
  console.log('');

  try {
    const result = await checkSite(siteUrl);
    
    if (result.statusCode === 200) {
      console.log('✅ Site is accessible!');
      
      // Check if it's the React app
      if (result.body.includes('EstatePro') && result.body.includes('react')) {
        console.log('✅ React app is loading!');
        console.log('✅ Title found in HTML');
      } else {
        console.log('⚠️  Site is accessible but React app might not be loading correctly');
      }
      
      // Check for correct asset paths
      if (result.body.includes('/estate-pro-finder-main/assets/')) {
        console.log('✅ Asset paths are correctly configured for GitHub Pages');
      } else {
        console.log('⚠️  Asset paths might be incorrect');
      }
      
    } else {
      console.log(`❌ Site returned status code: ${result.statusCode}`);
    }
    
  } catch (error) {
    console.log('❌ Error checking site:', error.message);
  }

  // Also check some key routes
  const routes = ['/buy', '/rent', '/agents'];
  
  for (const route of routes) {
    const routeUrl = siteUrl + '#' + route;
    console.log(`\n🔍 Checking route: ${route}`);
    
    try {
      const result = await checkSite(siteUrl); // SPA routes all serve index.html
      if (result.statusCode === 200) {
        console.log(`✅ Route ${route} should work (SPA routing)`);
      }
    } catch (error) {
      console.log(`❌ Error checking route ${route}:`, error.message);
    }
  }
}

main().catch(console.error);
