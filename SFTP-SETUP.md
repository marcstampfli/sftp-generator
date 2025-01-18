# Comprehensive SFTP Generator Setup Guide

## 1. Initial SSH Connection Setup

### Generate SSH Key (Windows)

```bash
ssh-keygen -t rsa -b 4096 -C "marc-rpi" -f "D:/SSH Config/marc-rpi"
```

### Copy Public Key to Raspberry Pi

```bash
type "D:/SSH Config/marc-rpi.pub" | ssh marc-rpi@192.168.100.203 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### Test SSH Connection

```bash
ssh -i "D:/SSH Config/marc-rpi" marc-rpi@192.168.100.203
```

## 2. Remote Terminal Access

### VS Code Remote Terminal

Add this to `.vscode/sftp.json`:

```json
"remoteTerminal": {
    "enabled": true,
    "command": "ssh -i D:/SSH Config/marc-rpi marc-rpi@192.168.100.203"
}
```

### Accessing Terminal

1. Open VS Code Command Palette (Ctrl+Shift+P)
2. Select "SFTP: Open SSH in Terminal"

## 3. SMB Share Configuration

### Mount SMB Share

```bash
sudo umount /mnt/webdev
sudo mount -t cifs //192.168.100.203/webdev /mnt/webdev -o username=marc-rpi,uid=marc-rpi,gid=marc-rpi,file_mode=0775,dir_mode=0775
```

### Verify Mount

```bash
mount | grep webdev
```

## 4. SFTP Configuration

### VS Code SFTP Setup

Create `.vscode/sftp.json`:

```json
{
  "name": "Raspberry Pi",
  "host": "192.168.100.203",
  "protocol": "sftp",
  "port": 22,
  "username": "marc-rpi",
  "remotePath": "/mnt/webdev/sftp-generator",
  "localPath": "d:/Projects/SFTP Generator App/sftp-generator",
  "uploadOnSave": true,
  "privateKeyPath": "D:/SSH Config/marc-rpi",
  "ignore": [".vscode", ".git", "node_modules"]
}
```

## 5. Permission Management

### Verify Permissions

```bash
ls -ld /mnt/webdev/sftp-generator
```

### Fix Permissions

```bash
sudo chown -R marc-rpi:marc-rpi /mnt/webdev/sftp-generator
sudo chmod -R 775 /mnt/webdev/sftp-generator
```

## 6. Git Cloning

### Clone to Webdev Folder

```bash
git clone https://github.com/your-repo.git /mnt/webdev/project-name
```

## 7. Troubleshooting

### Common Issues

1. Permission denied:

   - Verify mount options
   - Check directory ownership
   - Ensure correct SSH key permissions

2. Connection refused:
   - Verify SSH service is running
   - Check firewall settings
   - Confirm correct IP address

### Logs

- VS Code SFTP extension logs: `View > Output > SFTP`
- SSH logs: `/var/log/auth.log`
