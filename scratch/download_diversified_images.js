const fs = require('fs');
const path = require('path');
const https = require('https');

const productsDir = path.join(__dirname, '..', 'public', 'images', 'products');
const galleryDir = path.join(__dirname, '..', 'public', 'images', 'gallery');

// 1. Ensure clean directories
[productsDir, galleryDir].forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      const p = path.join(dir, file);
      if (fs.statSync(p).isFile()) {
        fs.unlinkSync(p);
        console.log('Deleted old file:', file);
      }
    });
  } else {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 2. Multi-source image mapping (Pexels + Unsplash)
const productSources = {
  'tractor-trolley.jpg': 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels
  'four-wheel-hydraulic-trolley.jpg': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80', // Unsplash
  'two-wheel-hydraulic-trolley.jpg': 'https://images.pexels.com/photos/162637/agricultural-machinery-tractor-plow-field-162637.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels
  'hydraulic-dumper.jpg': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop&q=80', // Unsplash
  'water-tanker-trailer.jpg': 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels
  'medical-vehicle.jpg': 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&auto=format&fit=crop&q=80', // Unsplash
  'garbage-collection-vehicle.jpg': 'https://images.pexels.com/photos/15694291/pexels-photo-15694291.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels
  'agricultural-equipment.jpg': 'https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels
  'steel-gate.jpg': 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&auto=format&fit=crop&q=80', // Unsplash
  'steel-railing.jpg': 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels
  'agricultural-cultivator.jpg': 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels
  'custom-metal-fabrication.jpg': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80', // Unsplash
  'vehicle-repair-workshop.jpg': 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels
};

const gallerySources = {
  'gallery-tractor-trolley.jpg': 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800',
  'gallery-4w-hydraulic.jpg': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80',
  'gallery-2w-hydraulic.jpg': 'https://images.pexels.com/photos/162637/agricultural-machinery-tractor-plow-field-162637.jpeg?auto=compress&cs=tinysrgb&w=800',
  'gallery-hydraulic-dumper.jpg': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop&q=80',
  'gallery-water-tanker.jpg': 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=800',
  'gallery-cultivator.jpg': 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800',
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}, status: ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('\n--- Downloading Product Images ---');
  for (const [filename, url] of Object.entries(productSources)) {
    const dest = path.join(productsDir, filename);
    console.log(`Downloading ${filename}...`);
    try {
      await downloadFile(url, dest);
      console.log(`Saved ${filename} (${fs.statSync(dest).size} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }

  console.log('\n--- Downloading Gallery Images ---');
  for (const [filename, url] of Object.entries(gallerySources)) {
    const dest = path.join(galleryDir, filename);
    console.log(`Downloading ${filename}...`);
    try {
      await downloadFile(url, dest);
      console.log(`Saved ${filename} (${fs.statSync(dest).size} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
}

run();
