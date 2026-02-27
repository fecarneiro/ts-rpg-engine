```mermaid
flowchart TD
    A[index.html] --> B[main.ts]
    B --> C[Phaser.Game scene: Preload, World]
    C --> D[PreloadScene.preload]
    D --> E[PreloadScene.create]
    E --> F[WorldScene.create]
    F --> G[Jogo rodando]
```
