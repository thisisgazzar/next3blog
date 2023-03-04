import Identicon from "react-identicons";

export default function Form({
  address,
  setText,
  text,
  publishPost,
  buttonText,
  buttonDisabled,
}) {
  return (
    <form
      className="lg:w-1/2 flex flex-col w-full h-full bg-white overflow-hidden mb-[50px] shadow-md rounded-[8px] py-5 px-10 box-border"
      onSubmit={() => publishPost(text)}
    >
      <div className="w-full inline-flex justify-between items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-[#c7cacd] flex justify-center ">
          <Identicon string={address} size={45} />
        </div>
        <div className="w-4/5 lg:w-[90%]">
          <input
            type="text"
            id="post"
            className="font-openSans w-full p-3 text-md border rounded-[22px] focus:outline-none focus:shadow-outline"
            placeholder="Share Your Thoughts and Ideas!"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full justify-center items-center">
        <button
          className="w-full bg-[#1974E7] px-2 py-2 rounded-[6px] flex justify-center cursor-pointer disabled:opacity-50 disabled:cursor-default"
          type="submit"
          disabled={buttonDisabled}
          onClick={() => publishPost(text)}
        >
          <h2 className="font-openSans text-white transition">{buttonText}</h2>
        </button>
      </div>
    </form>
  );
}
