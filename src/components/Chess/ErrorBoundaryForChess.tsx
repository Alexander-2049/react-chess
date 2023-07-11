import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}
  
interface State {
  hasError: boolean;
}

class ErrorBoundaryForChess extends Component<Props, State> {
    public state: State = {
      hasError: false
    };
  
    public static getDerivedStateFromError(error: Error): State {
      // Update state so the next render will show the fallback UI.
      console.log(error.message);
      return { hasError: true };
    }
  
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error("Uncaught error:", error, errorInfo);
    }
  
    public render() {
      if (this.state.hasError) {
        return <h1>Sorry.. there was an error</h1>;
      }
  
      return this.props.children;
    }
}

export default ErrorBoundaryForChess;