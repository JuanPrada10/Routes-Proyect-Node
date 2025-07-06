function Details({ property, value }) {
  return (
    <>
      <p className="font-semibold">
        {property}:{" "}
        <span className=" py-1 px-4 rounded-2xl  shadow-slate-400 shadow-xs bg-slate-300">
          {value}
        </span>
      </p>
    </>
  );
}

export default Details;
