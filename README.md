# 🛒 Baskito - Smart Grocery Planning

A beautiful, professional grocery planning web application that makes shopping lists smart, organized, and effortless with AI-powered features, voice input, and budget tracking.

![Baskito App](https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Core Features

### 🎯 Smart List Management
- **Intelligent Lists** - Create, organize, and manage multiple grocery lists with smart categorization
- **Auto-categorization** - Items are automatically sorted into categories (Fruits, Vegetables, Dairy, etc.)
- **Priority System** - Mark items as low, medium, or high priority with visual indicators
- **Photo Attachments** - Capture photos to remember specific brands or products
- **Quantity & Price Tracking** - Add specific quantities and estimated prices for budget planning

### 🧠 AI-Powered Smart Features
- **Smart Suggestions** - Get personalized recommendations based on your shopping patterns
- **Seasonal Recommendations** - Discover seasonal fruits, vegetables, and holiday items
- **Frequently Bought Together** - Smart pairing suggestions (e.g., "bread" → "butter")
- **Memory-based Suggestions** - Quick access to your most frequently purchased items
- **Day-based Recommendations** - Contextual suggestions based on the day of the week

### 🎤 Voice Input & Accessibility
- **Voice Commands** - Add items by speaking naturally ("Add 2 gallons of milk")
- **Audio Feedback** - Confirmation when items are added via voice
- **Multiple Command Patterns** - Supports various ways of speaking ("Buy", "Add", "Get", "Need")
- **Hands-free Shopping** - Perfect for when your hands are full

### 💰 Budget Management
- **Price Estimator** - Track estimated costs and stay within budget
- **Budget Alerts** - Visual warnings when approaching or exceeding your budget
- **Cost Tracking** - Monitor spending patterns and optimize your grocery budget
- **Quick Price Entry** - Common price shortcuts for faster input

### 🚀 Advanced Utility Features
- **Offline Support** - Works without internet connection using local storage
- **PWA Ready** - Install as a mobile app for native-like experience
- **Store Mode** - Simplified, discreet interface perfect for shopping in public
- **Dark/Light Mode** - Choose your preferred theme with smooth transitions
- **List Sharing** - Share lists with family or roommates (coming soon)

## 🎨 Professional Design

### Mobile-First Experience
- **Touch-Friendly** - Large tap targets and smooth gestures optimized for mobile
- **One-Hand Operation** - Easy to use while shopping with one hand
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Professional Appearance** - Sophisticated design suitable for any shopping environment

### Visual Excellence
- **Beautiful Backgrounds** - Vibrant grocery-themed imagery that enhances the experience
- **Smooth Animations** - Micro-interactions and transitions that delight users
- **Apple-Level Design** - Meticulous attention to detail and intuitive user experience
- **Consistent Branding** - Cohesive color scheme and typography throughout

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Storage**: Local Storage with IndexedDB ready
- **Voice**: Web Speech API
- **Build Tool**: Vite
- **PWA**: Service Worker ready

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Modern browser with Web Speech API support (Chrome, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/baskito.git
   cd baskito
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📱 Usage Guide

### Creating Your First List
1. Click "Create List" to start
2. Add items using the "Add Item" button or voice input
3. Specify quantity, category, priority, and estimated price
4. Optionally add photos and notes for specific brands

### Using Smart Features

#### Voice Input
1. Click the "Voice Add" button
2. Say commands like:
   - "Add milk"
   - "Buy 2 apples"
   - "Get 1 gallon orange juice"
   - "Need chicken breast"
3. Items are automatically added with smart categorization

#### Smart Suggestions
1. Click "Smart Tips" to see personalized recommendations
2. Browse seasonal picks, day-based suggestions, and frequently bought together items
3. Tap any suggestion to instantly add it to your list

#### Budget Tracking
1. Set your budget in the Price Estimator
2. Add estimated prices to items as you build your list
3. Monitor your spending with the visual budget tracker
4. Get alerts when approaching your budget limit

### Using Templates
1. Click "Templates" for quick list creation
2. Choose from pre-built templates:
   - **Weekly Essentials** - Basic grocery needs
   - **Monthly Stock-Up** - Bulk items and household goods
   - **Comfort Food** - Rainy day treats
   - **Healthy Living** - Nutritious options

### Shopping Mode
1. Enable "Store Mode" in settings for a clean, minimal interface
2. Large checkboxes and text for easy one-hand operation
3. Discreet design perfect for public use

### Managing Multiple Lists
1. Use the Lists manager to create and switch between lists
2. Each list maintains its own items, completion status, and budget
3. Add emojis and custom names to organize your lists
4. Delete lists you no longer need (minimum one list required)

## 🎨 Design Philosophy

Baskito follows modern design principles with a focus on:

- **Simplicity** - Clean, uncluttered interface that doesn't overwhelm
- **Intelligence** - Smart features that learn from your habits
- **Accessibility** - High contrast ratios, readable fonts, and voice support
- **Performance** - Fast loading and smooth animations
- **Mobile First** - Optimized for smartphone usage in real shopping scenarios
- **Professional** - Suitable for any shopping environment without embarrassment

## 🔧 Configuration & Customization

### Settings Options
- **Dark Mode** - Toggle between light and dark themes
- **Store Mode** - Simplified interface for shopping
- **Voice Input** - Enable/disable voice recognition features
- **Budget Tracking** - Set and manage your shopping budget
- **Notifications** - Enable shopping reminders (future feature)

### Customization
- Categories can be customized in `src/utils/categories.ts`
- Templates can be modified in `src/data/templates.ts`
- Color scheme can be adjusted in `tailwind.config.js`
- Voice commands can be extended in `src/components/VoiceInput.tsx`

## 📊 Data Storage & Privacy

All data is stored locally in your browser for complete privacy:
- **Lists** - Saved to localStorage as `baskito-lists`
- **Settings** - Saved to localStorage as `baskito-settings`
- **Search History** - Saved to localStorage as `baskito-search-history`
- **Budget Data** - Saved to localStorage as `baskito-budget`

**Privacy First**: No data is sent to external servers, ensuring complete privacy and offline functionality.

## 🔮 Roadmap & Future Features

### Smart Enhancements
- [ ] **AI-Powered Meal Planning** - Suggest complete meal plans with shopping lists
- [ ] **Barcode Scanning** - Add items by scanning product barcodes
- [ ] **Recipe Integration** - Import ingredients from recipes automatically
- [ ] **Pantry Inventory** - Track what's already in your kitchen
- [ ] **Expiration Tracking** - Monitor food freshness and reduce waste

### Social & Sharing
- [ ] **Real-time Collaboration** - Share lists with family members
- [ ] **Shopping Together** - Coordinate when multiple people are shopping
- [ ] **Community Templates** - Share and discover list templates
- [ ] **Social Recommendations** - Get suggestions from friends

### Advanced Features
- [ ] **Store Layout Optimization** - Organize lists by store layout
- [ ] **Price Comparison** - Compare prices across different stores
- [ ] **Coupon Integration** - Automatically find and apply relevant coupons
- [ ] **Nutrition Tracking** - Monitor nutritional value of purchases
- [ ] **Sustainability Scoring** - Rate environmental impact of choices

### Technical Improvements
- [ ] **IndexedDB Storage** - Enhanced offline storage capabilities
- [ ] **Service Worker** - Full PWA functionality with background sync
- [ ] **Push Notifications** - Location-based and time-based reminders
- [ ] **Cloud Sync** - Optional cloud storage for device synchronization
- [ ] **Advanced Voice Commands** - More natural language processing


### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Areas for Contribution
- **Smart Features** - Enhance AI suggestions and voice recognition
- **UI/UX** - Improve design and user experience
- **Performance** - Optimize loading and responsiveness
- **Accessibility** - Improve support for users with disabilities
- **Testing** - Add comprehensive test coverage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Icons** by [Lucide](https://lucide.dev/)
- **Images** from [Pexels](https://pexels.com/)
- **Built with** [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- **Voice Recognition** powered by Web Speech API
- **Design Inspiration** from Apple's Human Interface Guidelines


## 🏆 Awards & Recognition

Baskito has been designed to compete with the best grocery apps in the market:
- **Production-Ready** - Professional quality suitable for app stores
- **Feature-Rich** - Comprehensive functionality rivaling commercial apps
- **User-Centric** - Designed based on real shopping pain points
- **Innovation** - Unique voice input and smart suggestion features

---

**Made with ❤️ for smarter, more efficient grocery shopping**

*Transform your grocery shopping experience with Baskito - where technology meets everyday convenience.*
