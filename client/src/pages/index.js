import { useEffect, useState } from "react";
import {
  useAddress,
  useMetamask,
  useChainId,
  useContract,
  ChainId,
} from "@thirdweb-dev/react";
import { Navbar, Form, Post } from "@/components";

export default function App() {
  const address = useAddress();
  const connect = useMetamask();
  const chainId = useChainId();

  const { contract } = useContract(
    "0x1e55A7D8c854c239cD30EA737700D1C7d7273395"
  );
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [publishLoading, setPublishLoading] = useState(false);

  const buttonText = !address
    ? "Connect Wallet"
    : chainId !== ChainId.Mumbai
    ? "Connect to the Mumbai TestNet"
    : publishLoading
    ? "Loading..."
    : "Publish";
  const buttonDisabled =
    !address || chainId !== ChainId.Mumbai || publishLoading;

  const getPosts = async () => {
    try {
      const posts = await contract.call("getPosts");
      const parsedPosts = posts.map((post, i) => ({
        owner: post.owner,
        postContent: post.postContent,
        id: post.postId.toNumber(),
      }));
      setPosts(parsedPosts);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const publishPost = async (text) => {
    if (text.length > 0 && contract) {
      try {
        setPublishLoading(true);
        const data = await contract.call("addPost", text);
        if (data.receipt.status === 1) {
          getPosts();
          setText("");
        }
        return data;
      } catch (err) {
        console.error("contract call failure", err);
      } finally {
        setPublishLoading(false);
      }
    }
  };
  const deletePost = async (id) => {
    try {
      const data = await contract.call("deletePost", id);
      if (data.receipt.status === 1) {
        getPosts();
      }
      return data;
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  useEffect(() => {
    if (contract) getPosts();
  }, [address, contract]);

  return (
    <div className="bg-[#eff2f5] flex flex-col min-h-screen">
      <Navbar connect={connect} address={address} />

      <div className="pt-12 pb-6 flex flex-col items-center justify-center">
        <Form
          address={address}
          setText={setText}
          text={text}
          publishPost={publishPost}
          publishLoading={publishLoading}
          buttonDisabled={buttonDisabled}
          buttonText={buttonText}
        />

        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            owner={post.owner}
            address={address}
            postContent={post.postContent}
            deletePost={deletePost}
          />
        ))}
      </div>
    </div>
  );
}
