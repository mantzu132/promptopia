import Link from "next/link";

const Form = ({
  type,
  inputValue,
  setInputValue,
  submitting,
  handleSubmit,
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts wit the world , and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        action=""
        className="mt-10 w-full max-w-2xl flex flex-col gap-5 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt:
          </span>
        </label>
        <textarea
          rows="4"
          cols="50"
          value={inputValue.prompt}
          placeholder="Write your prompt here"
          onChange={(e) =>
            setInputValue({ ...inputValue, prompt: e.target.value })
          }
          required
          className="form_input"
        ></textarea>

        {/*-------------TAG PART OF THE FORM------------*/}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag:
          </span>
        </label>
        <input
          type="text"
          value={inputValue.tag}
          placeholder="Write your tag here (#product, #webdevelopment, #idea)"
          onChange={(e) =>
            setInputValue({ ...inputValue, tag: e.target.value })
          }
          required
          className="form_input"
        />

        {/*--------BUTTON ------*/}

        <div className="flex-end mx-3  gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={!submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
