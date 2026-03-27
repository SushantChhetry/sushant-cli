class SushantCli < Formula
  desc "Programmable product judgment in your terminal."
  homepage "https://github.com/sushant/sushant-cli"
  url "https://registry.npmjs.org/sushant-cli/-/sushant-cli-0.1.0.tgz"
  sha256 "337651688e6d24d96805de484f837993873d340b24035b88d3b00a09316e0967"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
  end

  test do
    output = shell_output("#{bin}/sushant whoami 2>&1", 1)
    assert_match "Not configured", output
  end
end
