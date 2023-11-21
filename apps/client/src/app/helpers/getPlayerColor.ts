const getPlayerColor = (index: number) => {
    return ["jo-green", "jo-purple", "jo-red", "jo-blue", "jo-main", "jo-black"][index % 6];
};

export { getPlayerColor };
