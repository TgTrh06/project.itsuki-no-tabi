# Color Synchronization Guide - Shadcn Theme

## ✅ Completed Files:
1. ✅ `index.css` - Theme variables added
2. ✅ `tailwind.config.js` - Theme integration
3. ✅ `index.html` - Google Fonts
4. ✅ `Navbar.jsx` - Updated with theme colors
5. ✅ `HomePage.jsx` - Updated with theme colors
6. ✅ `LoginPage.jsx` - Updated with theme colors
7. ✅ `ArticleDetailPage.jsx` - Updated with theme colors

## 🎨 Color Mapping Reference:

### Replace these hardcoded colors with theme tokens:

| Old Color | New Theme Token | Usage |
|-----------|----------------|-------|
| `bg-white` | `bg-card` | Card backgrounds |
| `bg-gray-50` | `bg-muted` | Muted backgrounds |
| `bg-gray-100` | `bg-secondary` | Secondary backgrounds |
| `text-gray-900` | `text-foreground` | Primary text |
| `text-gray-700` | `text-foreground` | Body text |
| `text-gray-600` | `text-muted-foreground` | Secondary text |
| `text-gray-500` | `text-muted-foreground` | Muted text |
| `bg-blue-600` | `bg-primary` | Primary buttons |
| `text-blue-600` | `text-primary` | Primary links |
| `bg-blue-50` | `bg-accent` | Accent backgrounds |
| `text-blue-700` | `text-accent-foreground` | Accent text |
| `bg-green-500` | `bg-primary` | Success/Primary actions |
| `bg-red-500` | `bg-destructive` | Error/Destructive actions |
| `text-red-600` | `text-destructive` | Error text |
| `border-gray-200` | `border-border` | Borders |
| `border-gray-300` | `border-input` | Input borders |
| `focus:ring-blue-500` | `focus:ring-ring` | Focus rings |

## 📝 Files Still Need Updates:

### High Priority:
- [ ] `SignUpPage.jsx` - Auth page
- [ ] `PlanningPage.jsx` - Main feature page
- [ ] `ArticleListPage.jsx` - Article listing
- [ ] `UserProfile.jsx` - User profile
- [ ] `AdminLayout.jsx` - Admin interface

### Medium Priority:
- [ ] `ArticleCreatePage.jsx`
- [ ] `ArticleEditPage.jsx`
- [ ] `InterestTagInput.jsx`
- [ ] `InterestsListPage.jsx`
- [ ] `DestinationPage.jsx`
- [ ] `DestinationDetailPage.jsx`

### Low Priority:
- [ ] `ForgotPasswordPage.jsx`
- [ ] `ResetPasswordPage.jsx`
- [ ] `EmailVerificationPage.jsx`
- [ ] `AdminProfile.jsx`
- [ ] `PasswordStrengthMeter.jsx`
- [ ] `Input.jsx`

## 🔧 Quick Find & Replace Patterns:

### Background Colors:
```
bg-white → bg-card
bg-gray-50 → bg-muted
bg-gray-100 → bg-secondary
bg-blue-600 → bg-primary
bg-blue-50 → bg-accent
bg-green-500 → bg-primary
bg-red-50 → bg-destructive/10
```

### Text Colors:
```
text-gray-900 → text-foreground
text-gray-700 → text-foreground
text-gray-600 → text-muted-foreground
text-gray-500 → text-muted-foreground
text-blue-600 → text-primary
text-red-600 → text-destructive
```

### Borders:
```
border-gray-200 → border-border
border-gray-300 → border-input
border-blue-500 → border-primary
```

### Focus States:
```
focus:ring-blue-500 → focus:ring-ring
focus:border-blue-500 → focus:border-ring
```

### Hover States:
```
hover:bg-blue-700 → hover:opacity-90 (when using bg-primary)
hover:bg-gray-100 → hover:bg-muted
hover:text-blue-600 → hover:text-primary
```

## 💡 Best Practices:

1. **Use semantic tokens** instead of color names
2. **Maintain consistency** across all components
3. **Test dark mode** compatibility (add `dark` class to html)
4. **Use opacity** for hover states on solid colors
5. **Add font-serif** for headings where appropriate

## 🎯 Theme Colors Overview:

### Light Mode:
- **Primary**: `#2e7d32` (Green)
- **Background**: `#f8f5f0` (Warm beige)
- **Card**: `#f8f5f0` (Same as background)
- **Muted**: `#f0e9e0` (Light tan)
- **Accent**: `#c8e6c9` (Light green)
- **Destructive**: `#c62828` (Red)

### Dark Mode:
- **Primary**: `#4caf50` (Brighter green)
- **Background**: `#1c2a1f` (Dark green-gray)
- **Card**: `#2d3a2e` (Lighter dark)
- **Muted**: `#252f26` (Muted dark)
- **Accent**: `#388e3c` (Medium green)

## 🚀 Next Steps:

1. Update remaining high-priority files
2. Test all pages for visual consistency
3. Verify dark mode support
4. Check responsive design
5. Update any custom components
