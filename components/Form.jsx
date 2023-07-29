import Link from "next/link";
import { Button, Loading } from "@nextui-org/react";

const btnStyle = {
  background: "#1D9BF0",
  textAlign: "center",
  color: "white",
  paddingTop: "0.25rem",
  paddingRight: "1rem",
  paddingBottom: "0.25rem",
  paddingLeft: "1rem",
  borderRadius: "9999px",
  fontWeight: "bold",
};

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full flex items-center justify-between">
      <form
        className="flex items-center justify-between w-full"
        onSubmit={handleSubmit}
      >
        <input
          value={post.tweet}
          onChange={(e) => setPost({ ...post, tweet: e.target.value })}
          placeholder="What is happening?!"
          required
          className="xl:bg-transparent text-xl focus:outline-none focus:shadow-outline text-white w-[80%]"
        />

        {post.tweet ? (
          <Button auto type="submit" disabled={submitting} style={btnStyle}>
            {submitting ? (
              <Loading type="points" color="currentColor" size="sm" />
            ) : (
              type
            )}
          </Button>
        ) : (
          <Button
            auto
            disabled
            style={{
              background: "#1D9BF0",
              textAlign: "center",
              color: "white",
              paddingTop: "0.25rem",
              paddingRight: "1rem",
              paddingBottom: "0.25rem",
              paddingLeft: "1rem",
              borderRadius: "9999px",
              fontWeight: "bold",
              opacity: 0.5,
            }}
          >
            {submitting ? (
              <Loading type="points" color="currentColor" size="sm" />
            ) : (
              type
            )}
          </Button>
        )}
      </form>
    </section>
  );
};

export default Form;
