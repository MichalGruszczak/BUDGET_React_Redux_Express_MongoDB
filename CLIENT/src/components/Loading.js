import React, { useMemo } from "react";
import "./Loading.scss";

import { useSelector } from "react-redux";

const Loading = () => {
  const theme = useSelector((state) => state.theme.theme);

  const memoLoading = useMemo(() => {
    return (
      <div className={theme === "dark" ? "loading dark" : "loading"}>
        <div className="loading__dotTyping"></div>
      </div>
    );
  }, [theme]);

  return <>{memoLoading}</>;
};

export default Loading;
