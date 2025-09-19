# Airtable Integration Setup Guide

This guide will help you set up Airtable as a Content Management System (CMS) for your coordinated living project.

## Prerequisites

1. An Airtable account (free tier is sufficient)
2. Access to your project's environment variables

## Step 1: Create Your Airtable Base

1. Go to [Airtable.com](https://airtable.com) and create a new base
2. Name it something like "Coordinated Living CMS"

## Step 2: Set Up Tables

### Posts Table
Create a table called "Posts" with the following fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| `title` | Single line text | Post title |
| `leftContent` | Long text | Left column content |
| `rightContent` | Long text | Right column content |
| `bottomRightContent` | Long text | Bottom right content |
| `published` | Checkbox | Whether the post is published (default: checked) |
| `order` | Number | Display order (1, 2, 3, etc.) |
| `createdDate` | Date | When the post was created |

### Guides Table
Create a table called "Guides" with the following fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| `title` | Single line text | Guide title |
| `description` | Long text | Guide description |
| `content` | Long text | Full guide content (optional) |
| `downloadUrl` | URL | Link to downloadable file (optional) |
| `published` | Checkbox | Whether the guide is published (default: checked) |
| `order` | Number | Display order (1, 2, 3, etc.) |
| `createdDate` | Date | When the guide was created |

## Step 3: Get Your API Credentials

### API Key
1. Go to [Airtable Developer Hub](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Give it a name like "Coordinated Living CMS"
4. Select your base and give it "Read" permissions
5. Copy the generated API key

### Base ID
1. Go to your Airtable base
2. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
3. The Base ID is the part after `/app` and before the next `/`
4. Copy this Base ID

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
```

**Important:** Never commit your `.env.local` file to version control!

## Step 5: Add Sample Content

### Add Posts
1. Go to your Posts table in Airtable
2. Add a few sample posts with the following structure:
   - **title**: "A THOUSAND TIMES I FAILED"
   - **leftContent**: Your left column content
   - **rightContent**: Your right column content
   - **bottomRightContent**: Your bottom right content
   - **published**: ✓ (checked)
   - **order**: 1

### Add Guides
1. Go to your Guides table in Airtable
2. Add a few sample guides with:
   - **title**: "Guide 1"
   - **description**: "Brief description of the guide"
   - **published**: ✓ (checked)
   - **order**: 1

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to your posts and guides sections
3. You should see your Airtable content loading
4. If there are any errors, check the browser console and server logs

## Features

### Automatic Fallback
- If Airtable is unavailable, the app will automatically fall back to hardcoded content
- This ensures your site never breaks due to API issues

### Caching
- Content is cached for 5 minutes to improve performance
- Reduces API calls and improves loading speed

### Real-time Updates
- Content updates in Airtable will appear on your site within 5 minutes
- No need to redeploy your application

## Content Management Workflow

1. **Draft Content**: Create new posts/guides in Airtable
2. **Review**: Use the checkbox to control what's published
3. **Order**: Use the order field to control display sequence
4. **Publish**: Check the "published" checkbox to make content live

## Troubleshooting

### Common Issues

1. **"Error fetching posts/guides"**
   - Check your API key and Base ID
   - Ensure your Airtable base has the correct table names ("Posts" and "Guides")
   - Verify your API key has read permissions

2. **Content not updating**
   - Check if the "published" checkbox is checked
   - Verify the order field has values
   - Wait up to 5 minutes for cache to refresh

3. **Empty content**
   - Ensure your Airtable fields match the expected names exactly
   - Check that you have at least one published record

### Getting Help

- Check the browser console for error messages
- Verify your environment variables are set correctly
- Test your Airtable API key using the [Airtable API documentation](https://airtable.com/developers/web/api/introduction)

## Security Notes

- Keep your API key secure and never share it publicly
- Use environment variables for all sensitive configuration
- Consider using Airtable's field-level permissions for additional security
- Regularly rotate your API keys

## Next Steps

Once everything is working:

1. **Train your content team** on using Airtable
2. **Set up content workflows** (draft → review → publish)
3. **Consider adding more fields** like categories, tags, or featured images
4. **Monitor performance** and adjust caching as needed

Your coordinated living project now has a powerful, user-friendly content management system! 🎉
