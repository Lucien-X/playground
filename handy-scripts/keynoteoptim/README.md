# keynoteoptim

## Brief

A useful CLI to optimize your keynote file.

## Installation

```bash
npm i -g keynoteoptim
```

## Usage

中文用户可以直接 keynoteoptim -h 或者 keynoteoptim --help 查看帮助

I am too lazy to adapt I18N, so the text in this CLI is basically Mandarin.

Please follow the steps below if you are a native English speaker.

### Interactively
Execute the line below in your terminal,
```bash
keynoteoptim
```
then drag .key file into your terminal,

hit enter again, and wait for it ~

### One-Liner
Execute something like below
```bash
keynoteoptim /this/is/an/absolute/url/bullshit.key 
```

## Theory

Based on my observation, .key and .zip files are identical.

In order to get a smaller file size, you can follow this operation flow：

force rename .key to .zip => unzip => optimize files in Data directory => zip back => rename back

This CLI is just a automated version of that procedure.

## Screenshot
![keynoteoptim screenshot](https://img.alicdn.com/tfs/TB1LTn5xQT2gK0jSZFkXXcIQFXa-696-842.png)