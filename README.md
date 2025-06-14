# 📝 Clario: Text Summarization App

A sleek and modern text summarization application built with React, powered by the OpenAI API, designed to transform lengthy text into concise, meaningful summaries with ease.

## ✨ Features

- 📋 **Text Summarization**: Generate concise summaries of any text using AI
- 🔑 **API Key Configuration**: Securely input and save your OpenAI API key
- 📊 **Text Analytics**: View word and character counts for input and summary
- 🎨 **Animated Summaries**: Smooth text animation for an engaging experience
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile
- ⚡ **Fast Performance**: Lightweight and efficient
- 🔒 **Secure Storage**: API key persistence using localStorage (development mode)
- 🚀 **Modern UI**: Built with Tailwind CSS for a polished look

## 🚀 Demo

[Live Demo](https://your-demo-link.com)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher) or **yarn**
- **Git**
- **OpenAI API Key** (signup required at [OpenAI](https://openai.com))

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Bhavin-Pathak/clario.git
cd clario
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

## 🔧 Environment Setup

### 1. Get OpenAI API Key

1. Visit [OpenAI](https://openai.com)
2. Sign up or log in to your account
3. Generate a new API key
4. Copy your API key

> **Note**: For production, it's recommended to use a backend server to securely handle the API key. The current setup uses localStorage for development purposes.

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view Clario in your browser.

## 🌐 API Reference

### OpenAI API Integration

Clario uses the OpenAI API to perform text summarization. The API key is entered by the user and stored in localStorage for development.

### API Call Example

The app makes the following request to summarize text:

```javascript
const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content:
        "You are a professional text summarizer. Create concise, well-structured summaries that capture the main points and key information from the given text. Keep summaries significantly shorter than the original while maintaining accuracy and clarity.",
    },
    {
      role: "user",
      content: `Please summarize the following text in 2-3 concise paragraphs, focusing on the main points and key information:\n\n${text}`,
    },
  ],
  max_tokens: Math.min(500, Math.floor(text.length / 4)),
  temperature: 0.3,
});
```

### Utility Methods

```javascript
// Summarize text using OpenAI API
await summarizeText(inputText, apiKey);
```

## 🛠️ Technologies Used

**Frontend:**

- React 18
- JavaScript (ES6+)
- Tailwind CSS
- HTML5

**APIs:**

- OpenAI API (gpt-4o-mini model)

**Tools:**

- Create React App
- npm/yarn
- Git

## 🌟 Additional Features

- **Input Validation**: Ensures text and API key are provided before processing
- **Error Handling**: Displays user-friendly error messages for API failures
- **Success Feedback**: Confirms successful API key saving and summarization
- **Text Length Reduction**: Shows the percentage by which the summary is shorter

## 📞 Support

If you have any questions or need help, please:

- Check the [Issues](https://github.com/Bhavin-Pathak/clario/issues) page
- Create a new issue if your problem isn't already reported
- Contact: your-email@example.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contributing Guidelines

- Follow React best practices
- Use functional components with hooks
- Write clean, commented code
- Add tests for new features
- Update documentation

---

⭐ **If you found this project helpful, please give it a star!**
