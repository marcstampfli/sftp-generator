# SFTP Configuration Generator Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [App Architecture](#app-architecture)
3. [Configuration Options](#configuration-options)
4. [Validation Rules](#validation-rules)
5. [Template System](#template-system)
6. [VSCode Integration](#vscode-integration)
7. [Error Handling](#error-handling)
8. [Development Setup](#development-setup)

## Introduction
This documentation covers the SFTP Configuration Generator app that integrates with the liximomo SFTP extension for VSCode.

## App Architecture
### Components
- **Form Components**: Handle SFTP configuration input
- **Profile Manager**: Manages multiple configurations
- **JSON Generator**: Creates valid SFTP configuration files
- **UI Components**: Provides the user interface

## Configuration Options
### Core Options
- Hostname
- Port
- Username
- Authentication method (password/private key)
- Remote path
- Local path

### Advanced Options
- Sync on save
- File watcher settings
- Ignore patterns
- Upload on save

## Validation Rules
- Hostname format validation
- Port range checking
- Required fields based on auth type
- Path format validation
- Private key file existence

## Template System
### Predefined Templates
- Basic password authentication
- SSH key authentication
- Multi-environment setups
- WordPress deployment
- Static site deployment

## VSCode Integration
- Automatic .vscode/sftp.json generation
- Settings diff viewer
- Backup/restore functionality
- Multi-workspace support

## Error Handling
- Connection testing
- Validation feedback
- Error recovery suggestions
- Logging system

## Development Setup
### Requirements
- Node.js 18+
- VSCode with SFTP extension
- Git

### Installation
```bash
npm install
npm run dev
```

### Contribution Guidelines
- Follow existing code style
- Write tests for new features
- Document changes in CHANGELOG.md