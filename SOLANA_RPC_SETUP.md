# 🔗 Solana RPC Setup for Donations

## ⚠️ Current Issue

The public Solana mainnet RPC (`https://api.mainnet-beta.solana.com`) is **rate-limited** and gives **403 Forbidden** errors.

**Error you might see:**
```
❌ failed to get recent blockhash: Error: 403 : {"jsonrpc":"2.0","error":{"code": 403, "message":"Access forbidden"}}
```

---

## 🔧 Current Setup (Temporary)

The donation component is currently set to **Devnet** (Solana's test network):
```javascript
const connection = new Connection('https://api.devnet.solana.com');
```

**Devnet:**
- ✅ Free and unlimited
- ✅ No rate limits
- ❌ Not real SOL (test tokens only)
- ❌ Not for production

---

## 🚀 Production Solutions

For **real donations**, you need a production RPC endpoint:

### **Option 1: Helius (Recommended - Free Tier Available)**

1. Sign up at: https://helius.dev
2. Create a new project
3. Get your RPC URL: `https://mainnet.helius-rpc.com/?api-key=YOUR_KEY`
4. Add to `.env`:
   ```bash
   NEXT_PUBLIC_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
   ```

**Free Tier:**
- 100k requests/day
- Perfect for small-medium traffic

---

### **Option 2: QuickNode**

1. Sign up at: https://quicknode.com
2. Create a Solana Mainnet endpoint
3. Get your URL: `https://your-endpoint.solana-mainnet.quiknode.pro/YOUR_TOKEN/`
4. Add to `.env`:
   ```bash
   NEXT_PUBLIC_SOLANA_RPC_URL=https://your-endpoint.solana-mainnet.quiknode.pro/YOUR_TOKEN/
   ```

**Free Tier:**
- 5M credits/month
- Good for moderate traffic

---

### **Option 3: Alchemy**

1. Sign up at: https://alchemy.com
2. Create Solana Mainnet app
3. Get your URL: `https://solana-mainnet.g.alchemy.com/v2/YOUR_API_KEY`
4. Add to `.env`:
   ```bash
   NEXT_PUBLIC_SOLANA_RPC_URL=https://solana-mainnet.g.alchemy.com/v2/YOUR_API_KEY
   ```

**Free Tier:**
- 300M compute units/month
- Enterprise features

---

## 🔨 Implementation

### **Step 1: Get RPC URL**

Choose one of the options above and get your RPC URL.

### **Step 2: Add to Netlify**

Add this environment variable:
```bash
Key: NEXT_PUBLIC_SOLANA_RPC_URL
Value: your_rpc_url_here
```

### **Step 3: Update Component**

The donation component will automatically use the custom RPC if set:

```javascript
// In SolanaDonate.tsx
const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const connection = new Connection(rpcUrl);
```

---

## 🎯 Testing

### **Test with Devnet (Current):**
1. Switch your Phantom wallet to **Devnet**
2. Get free devnet SOL from: https://solfaucet.com
3. Try a donation
4. Should work without 403 errors!

### **Production with Mainnet:**
1. Add `NEXT_PUBLIC_SOLANA_RPC_URL` with your paid RPC
2. Switch Phantom wallet to **Mainnet**
3. Donations use real SOL
4. No rate limits! 🎉

---

## 📊 Comparison

| Provider | Free Tier | Rate Limit | Best For |
|----------|-----------|------------|----------|
| **Public Mainnet** | Yes | Very low (403 errors) | ❌ Not recommended |
| **Devnet** | Yes | None | ✅ Testing only |
| **Helius** | 100k/day | High | ✅ Production (small) |
| **QuickNode** | 5M credits | Medium | ✅ Production (medium) |
| **Alchemy** | 300M units | High | ✅ Production (large) |

---

## 🔍 Current State

**Donations are set to DEVNET for now** to avoid 403 errors.

**To enable real donations:**
1. Sign up for Helius/QuickNode/Alchemy
2. Get your mainnet RPC URL
3. Add `NEXT_PUBLIC_SOLANA_RPC_URL` to Netlify
4. Redeploy

---

## 💡 Why This Happens

The public Solana RPC is:
- Free but heavily rate-limited
- Gives 403 errors under load
- Not meant for production apps
- Shared by thousands of developers

**Solution:** Use a dedicated RPC provider with your own endpoint!

---

## ✅ Quick Fix Checklist

**For Testing (Now):**
- [x] Switch to Devnet RPC (done)
- [ ] Set Phantom wallet to Devnet
- [ ] Get devnet SOL from faucet
- [ ] Test donations

**For Production (Later):**
- [ ] Sign up for Helius/QuickNode/Alchemy
- [ ] Get mainnet RPC URL
- [ ] Add `NEXT_PUBLIC_SOLANA_RPC_URL` to Netlify
- [ ] Redeploy
- [ ] Test with real SOL

---

**Devnet donations work now, but use test SOL only. Add a production RPC for real donations!** 🚀

