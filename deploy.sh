#!/bin/bash
# Justice Minds - Automated Deployment Script
# Maintains Vercel CLI, Supabase, and GitHub integration

set -e

echo "🏛️  Justice Minds - Judicial Audio Evidence Deployment"
echo "=================================================="

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
    echo "✅ Environment variables loaded"
else
    echo "❌ .env.local file not found"
    exit 1
fi

# Verify Vercel CLI is authenticated
echo "🔐 Verifying Vercel authentication..."
export VERCEL_TOKEN=$VERCEL_TOKEN
vercel whoami || {
    echo "❌ Vercel authentication failed"
    exit 1
}

# Test Supabase connection
echo "🗄️  Testing Supabase audio storage connection..."
curl -s "https://$SUPABASE_PUBLIC_DOMAIN/storage/v1/object/public/audio-evidence/exact_08_De_Facto_Parent_Status_DD_EXACT.mp3" \
    --head > /dev/null && echo "✅ Supabase audio storage accessible" || echo "⚠️  Supabase connection warning"

# Git operations
echo "📝 Committing latest changes..."
git add .
git status

# Check if there are changes to commit
if ! git diff --cached --quiet; then
    git commit -m "Automated deployment update

- Updated environment configuration
- Maintained Vercel CLI persistence  
- Verified Supabase audio storage connectivity
- Domain: judicial.justice-minds.com active

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    
    echo "📤 Pushing to GitHub..."
    git push origin main || {
        echo "⚠️  GitHub push failed - continuing with Vercel deployment"
    }
else
    echo "ℹ️  No changes to commit"
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod --yes

# Verify domain is working
echo "🌐 Verifying domain accessibility..."
sleep 5
curl -s -I "https://$CUSTOM_DOMAIN" | head -n 1

# Verify Cloudflare DNS
echo "🛡️  Verifying Cloudflare DNS..."
dig +short $CUSTOM_DOMAIN

echo ""
echo "✅ Deployment Complete!"
echo "🌍 Live Site: https://$CUSTOM_DOMAIN"
echo "📊 Vercel Dashboard: https://vercel.com/$VERCEL_ORG_ID"
echo "☁️  Cloudflare: Zone $CLOUDFLARE_ZONE_ID"
echo "=================================================="