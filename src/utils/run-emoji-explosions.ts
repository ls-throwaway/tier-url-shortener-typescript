export default async function runEmojiExplosions(): Promise<void> {
    const { emojisplosions } = await import('emojisplosion');

    const { cancel } = emojisplosions({
        emojis: ['🦁', '🛴', '🛵', '🚲', '🦊', '🐻', '🐨', '🐼'],
    });

    // ...but stop after ten seconds.
    setTimeout(cancel, 10000);
}
