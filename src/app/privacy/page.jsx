export const metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto py-12 text-justify">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="opacity-80 mb-6 text-center">Last Updated: February 2025</p>

      <div className="space-y-6 leading-relaxed bg-base-100/50 backdrop-blur-md">
        <section>
          <h3 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h3>
          <p>
            We may collect information that you voluntarily provide, such as
            your name, email address, or any content you submit. We also collect
            non-identifiable technical data including IP address, browser type,
            device information, pages visited, and general usage statistics.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h3>
          <p>
            We use the information to improve the website, personalize content,
            respond to messages, analyze traffic, and maintain platform
            security. We do <strong>not</strong> sell or rent your data to third
            parties.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">3. Cookies</h3>
          <p>
            Cookies may be used to remember your preferences, enhance website
            functionality, and analyze usage. You may disable cookies anytime
            through your browser settings.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">
            4. Third-Party Services
          </h3>
          <p>
            We may use trusted third-party tools such as analytics providers,
            authentication services, or hosting providers. These third parties
            may collect additional information as described in their own privacy
            policies.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">5. Data Protection</h3>
          <p>
            Reasonable measures are taken to protect your data from unauthorized
            access or misuse. Despite these efforts, no online service can
            guarantee complete security.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">6. Your Choices</h3>
          <p>
            You may request deletion of any personal information you've shared,
            disable cookies, or stop using the website at any time.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">
            7. Changes to This Policy
          </h3>
          <p>
            We may update this Privacy Policy periodically. All changes will be
            posted here with a new “Last Updated” date.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">8. Contact</h3>
          <p>
            If you have any questions regarding this Privacy Policy, feel free
            to contact us at:{" "}
            <a
              className="font-semibold link"
              href="mailto:buildwithmeraj@gmail.com"
            >
              buildwithmeraj@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
