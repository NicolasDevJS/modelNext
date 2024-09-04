// pages/api/csgo.js
import SteamUser from 'steam-user';
import GlobalOffensive from 'globaloffensive';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = new SteamUser();
    const csgo = new GlobalOffensive(user);

    user.logOn({
      accountName: username,
      password: password,
    });

    user.on('loggedOn', () => {
      console.log('Logged into Steam');
      user.gamesPlayed([730]); // ID do CS:GO
    });

    csgo.on('connectedToGC', () => {
      console.log('Connected to CS:GO Game Coordinator');

      const inventory = csgo.inventory;

      if (inventory) {
        // Mapear os itens corretamente
        const items = inventory.map(item => ({
          name: item.market_hash_name || item.market_name || 'Unknown',
          paintIndex: item.paint_index || 'N/A',
          wear: item.paint_wear || 'N/A',
          customName: item.custom_name || 'No custom name',
          tradableAfter: item.tradable_after ? item.tradable_after.toString() : 'Now',
        }));

        console.log('Inventory:', items);
        res.status(200).json({ message: 'Connected to CS:GO GC', inventory: items });
      } else {
        res.status(500).json({ error: 'Failed to retrieve inventory' });
      }
    });

    csgo.on('disconnectedFromGC', (reason) => {
      console.log('Disconnected from GC:', reason);
      res.status(500).json({ error: 'Disconnected from GC', reason });
    });

    csgo.on('error', (err) => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error connecting to GC', details: err });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
