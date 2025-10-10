# 🔧 Donation "Not Configured" Troubleshooting

If the donation button shows **"Not configured"** even after adding `NEXT_PUBLIC_SOLANA_ADDRESS`:

---

## ✅ Quick Fix Steps

### 1. **Verify Variable Name (Case Sensitive!)**

Make sure it's EXACTLY:
```
NEXT_PUBLIC_SOLANA_ADDRESS
```

**NOT:**
- ❌ `SOLANA_ADDRESS` (missing NEXT_PUBLIC_)
- ❌ `next_public_solana_address` (wrong case)
- ❌ `NEXT_PUBLIC_SOLANA_WALLET` (wrong name)

---

### 2. **Check the Value**

Make sure the value is your actual Solana wallet address, not empty:
```
Example: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
```

---

### 3. **Force Redeploy**

Netlify might not have redeployed after adding the variable:

**Option A - Clear Cache & Redeploy:**
1. Go to Netlify → **Deploys**
2. Click **"Trigger deploy"** dropdown
3. Select **"Clear cache and deploy site"**

**Option B - Push a Change:**
```bash
git commit --allow-empty -m "Trigger redeploy for env vars"
git push
```

---

### 4. **Check Build Logs**

1. Go to Netlify → **Deploys**
2. Click on the latest deploy
3. Check logs for environment variables being loaded
4. Look for: `NEXT_PUBLIC_SOLANA_ADDRESS`

---

### 5. **Verify in Browser Console**

After redeploying, open browser console (F12) and look for:

**✅ Working:**
```
💰 Donation wallet configured: ✅ Yes
💰 Wallet address: 7xKXtg2...
```

**❌ Still Not Working:**
```
💰 Donation wallet configured: ❌ No
⚠️ NEXT_PUBLIC_SOLANA_ADDRESS not set
```

---

## 🔍 Advanced Debugging

### Check Environment Variable in Netlify

1. Go to: **Site configuration** → **Environment variables**
2. Find `NEXT_PUBLIC_SOLANA_ADDRESS`
3. Check:
   - ✅ Key is exact: `NEXT_PUBLIC_SOLANA_ADDRESS`
   - ✅ Value has your wallet address
   - ✅ Scopes: "Same value for all deploy contexts"

### Test Locally

Add to your **local `.env`** file:
```bash
NEXT_PUBLIC_SOLANA_ADDRESS=your_wallet_address_here
```

Then:
```bash
npm run dev
```

Open http://localhost:3000/game and check if donation modal shows the address.

---

## 🎯 Common Issues

### Issue 1: Variable Added But Not Deployed
**Solution:** Manually trigger deploy or push empty commit

### Issue 2: Variable Name Typo
**Solution:** Delete and re-add with exact name

### Issue 3: Build Cache
**Solution:** Clear cache and redeploy

### Issue 4: Wrong Scope
**Solution:** Set to "Same value for all deploy contexts"

---

## 📞 Still Not Working?

Check these in order:

1. ✅ Variable name is EXACTLY `NEXT_PUBLIC_SOLANA_ADDRESS`
2. ✅ Value is a valid Solana address (not empty)
3. ✅ Netlify has redeployed AFTER adding variable
4. ✅ Build logs show no errors
5. ✅ Browser cache cleared (hard refresh: Ctrl+Shift+R)

---

## 🔄 Force Cache Clear

Sometimes the browser caches the old environment:

**Chrome/Edge:**
- Windows: `Ctrl + Shift + Delete`
- Mac: `Cmd + Shift + Delete`
- Then clear "Cached images and files"

**Or:**
- Hard refresh: `Ctrl + Shift + R` (Windows)
- Hard refresh: `Cmd + Shift + R` (Mac)

---

## ✅ Success Indicators

You'll know it's working when:

1. **Console shows:**
   ```
   💰 Donation wallet configured: ✅ Yes
   💰 Wallet address: [your address]
   ```

2. **Donation modal shows:**
   - Purple box with your wallet address
   - No red warning box

3. **Donate button:**
   - Is enabled (not grayed out)
   - Shows "Donate with Phantom" (not disabled)

---

**Once you see the wallet address in the modal, donations will work!** 💰✅

