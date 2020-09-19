default:
	echo "Default command disabled."

# Example: `build-posts version=0.0.1`
POSTS_IMAGE := rdok/microservices-app-kata_posts
POSTS_PATH := ../posts
build-posts:
	docker build --tag "${POSTS_IMAGE}:${version}" "${POSTS_PATH}"

deploy-posts:
	kubectl apply -f k8s/posts.yml

kubectl-get-pods:
	kubectl get pods
