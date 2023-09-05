//create a hook with the warrios return data
export default function useWarrior(ctx, x, y) {

    const write = () => {
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, 50, 50);
    }


    return {
        write
    }
}