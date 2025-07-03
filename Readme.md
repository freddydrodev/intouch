# Intouch

A modern Node.js library for seamless interaction with the Intouch API. This library provides a simple and intuitive interface to make API calls to Intouch services.

## Installation

You can install the library using npm, yarn, or pnpm:

```bash
# Using npm
npm install @freddydrodev/intouch

# Using yarn
yarn add @freddydrodev/intouch

# Using pnpm
pnpm add @freddydrodev/intouch
```

## Quick Start

### Method 1: Environment Variables (Recommended)

The easiest way to use this library is through environment variables. Create a `.env` file in your project root:

```env
# Required for all operations
INTOUCH_AGENT_CODE="your_agent_code"
INTOUCH_PARTNER_ID="your_partner_id"
INTOUCH_LOGIN_API="your_login_api"
INTOUCH_PASSWORD_API="your_password_api"

# Required for Cash In operations
INTOUCH_CI_USERNAME="your_username"
INTOUCH_CI_PASSWORD="your_password"
```

Then initialize the client without parameters:

```typescript
import { Intouch } from "@freddydrodev/intouch";

// The client will automatically use the environment variables
const intouch = new Intouch();
```

### Method 2: Configuration Object

```typescript
import { Intouch } from "@freddydrodev/intouch";

// Initialize the client with a configuration object
const intouch = new Intouch({
  agentCode: "your_agent_code",
  partnerId: "your_partner_id",
  loginApi: "your_login_api",
  passwordApi: "your_password_api",
  username: "your_username",
  password: "your_password",
});
```

### Method 3: Individual Parameters

```typescript
import { Intouch } from "@freddydrodev/intouch";

// Initialize the client with individual parameters
const intouch = new Intouch(
  "your_agent_code",
  "your_partner_id",
  "your_login_api",
  "your_password_api",
  "your_username",
  "your_password"
);
```

## Configuration

### Environment Variables (Recommended)

| Variable               | Description                        | Required |
| ---------------------- | ---------------------------------- | -------- |
| `INTOUCH_AGENT_CODE`   | Your Intouch agent code            | Yes      |
| `INTOUCH_PARTNER_ID`   | Your partner ID                    | Yes      |
| `INTOUCH_LOGIN_API`    | API login credentials              | Yes      |
| `INTOUCH_PASSWORD_API` | API password credentials           | Yes      |
| `INTOUCH_CI_USERNAME`  | Username for digest authentication | Yes      |
| `INTOUCH_CI_PASSWORD`  | Password for digest authentication | Yes      |

### Configuration Object Interface

```typescript
interface IntouchConfig {
  agentCode: string; // Your Intouch agent code
  partnerId: string; // Your partner ID
  loginApi: string; // API login credentials
  passwordApi: string; // API password credentials
  username: string; // Username for digest authentication
  password: string; // Password for digest authentication
}
```

## Features

- 🔐 Secure authentication handling
- 💸 Easy payment processing
- 📱 Mobile money integration
- 🔄 Automatic retry mechanism
- 📝 TypeScript support
- ⚡ Promise-based API
- 🛡️ Error handling

## Usage Examples

### Check Balance

```typescript
// Get your current balance
const balance = await intouch.balance.get();
```

### Cash Out Operations

```typescript
// Orange Money Cash Out
await intouch.cashout.OM_CI();

// Moov Money Cash Out
await intouch.cashout.MOOV_CI();

// MTN Mobile Money Cash Out
await intouch.cashout.MTN_CI();

// Wave Money Cash Out
await intouch.cashout.WAVE_CI();
```

### Cash In Operations

```typescript
// Orange Money Cash In
await intouch.cashin.OM_CI();

// Moov Money Cash In
await intouch.cashin.MOOV_CI();

// MTN Mobile Money Cash In
await intouch.cashin.MTN_CI();

// Wave Money Cash In
await intouch.cashin.WAVE_CI();
```

## Requirements

- Node.js version 16 or higher
- TypeScript (if using TypeScript)

## Development

### Prerequisites

- Node.js (version 16 or higher)
- npm, yarn, or pnpm

### Setup

1. Clone the repository:

```bash
git clone https://github.com/freddydrodev/intouch.git
cd intouch
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Building

The library uses `tsup` for building. To build the library:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This will:

- Compile TypeScript to JavaScript
- Generate type definitions
- Create both CommonJS and ESM builds
- Output to the `dist` directory

### Development

To start development with watch mode:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Testing

```bash
npm run test
# or
yarn test
# or
pnpm test
```

## Project Structure

```
intouch/
├── src/           # Source files
├── dist/          # Build output
├── tests/         # Test files
├── tsup.config.ts # Build configuration
└── tsconfig.json  # TypeScript configuration
```

## Path Aliases

The project uses path aliases for cleaner imports. You can import files using the `@` alias:

```typescript
// Instead of
import { something } from "../../components/something";

// You can use
import { something } from "@/components/something";
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/freddydrodev/intouch/issues) on GitHub.
