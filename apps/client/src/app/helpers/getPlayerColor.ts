const getPlayerColor = (index: number) => {
    return ["bg-jo-green", "bg-jo-purple", "bg-jo-red", "bg-jo-blue", "bg-jo-main", "bg-jo-black"][index % 6];
};

export { getPlayerColor };
