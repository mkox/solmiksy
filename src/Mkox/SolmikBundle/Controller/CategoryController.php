<?php

namespace Mkox\SolmikBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Mkox\SolmikBundle\Form;
use Mkox\SolmikBundle\Entity;

class CategoryController extends Controller {

    /**
     *
     * @var type Doctrine\ORM\EntityManager
     */
    protected $em;

    public function indexAction() {
        return $this->redirectToRoute('solmik-start');
    }

    /**
     * @Route("/solmik/category/create", name="solmik-category-create")
     * @Template()
     */
    public function createAction(Request $request) {

        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

        $isAjax = $request->isXmlHttpRequest();

        // Create the form and inject the EntityManager
//        $form = new Form\CreateCategoryForm($this->em);

        $category = new Entity\Category();
        $form = $this->createForm(new Form\Type\CategoryType(), $category);

        $form->handleRequest($request);

//        if ($this->request->isPost()) {
//            $form->setData($this->request->getPost());

        if ($form->isValid()) {
//echo json_encode(array('form is valid'));
////echo new Response(json_encode($request));
////echo new Response(json_encode(array('name' => $request->request->get('name'))));
//exit;
            $this->em = $this->getDoctrine()->getManager();
            $this->em->persist($category);
            $this->em->flush();
            if ($isAjax) {
                $encoder = new JsonEncoder();
                $normalizer = new ObjectNormalizer();
                $normalizer->setCircularReferenceHandler(function ($category) {
                    return $category->getId();
                });
                $serializer = new Serializer(array($normalizer), array($encoder));
                $categoryJson = $serializer->serialize($category, 'json');
                return new JsonResponse(array('category' => $categoryJson, 'errors' => (string) $form->getErrors(true, false)));
            } else {
                return $this->redirectToRoute('solmik-start');
            }
        }
//        }
        if ($isAjax) {
            return new Response(json_encode(array('category' => $this->getRequest()->request->all(), 'errors' => (string) $form->getErrors(true, false))));
        } else {
            return array('form' => $form->createView());
        }
    }

    /**
     * @Route("/solmik/category/edit", name="solmik-category-edit")
     * @Template()
     */
    public function editAction(Request $request) {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        
        $isAjax = $request->isXmlHttpRequest();

//        if ($isAjax) {
//            $id = $request->request->get('id');
//        } else {
            $id = $request->query->get('id');
//        }

        $category = $this->getDoctrine()
                ->getRepository('MkoxSolmikBundle:Category')
                ->find($id);
        $form = $this->createForm(new Form\Type\CategoryType(), $category);
        $form->handleRequest($request);

        if ($form->isValid()) {
            // Save the changes
            $this->em = $this->getDoctrine()->getManager();
            $this->em->flush();
            if ($isAjax) {
                return new Response(json_encode(array('message' => 'Category is edited.', 'category' => $this->getRequest()->request->all())));
            } else {
                return $this->redirectToRoute('solmik-start');
            }
        } 
        else {
            if ($isAjax) {
                return new Response(json_encode(array('message' => 'Category form is NOT valid.', 'category' => $this->getRequest()->request->all(), 'errors' => (string) $form->getErrors(true, false))));
            }
        }

        if ($isAjax) {
            return new Response(json_encode(array('message' => 'Category is NOT edited.', 'category' => $this->getRequest()->request->all(), 'errors' => (string) $form->getErrors(true, false))));
        } else {
            return array('form' => $form->createView());
        }
    }

    /**
     * @Route("/solmik/category/delete", name="solmik-category-delete")
     * @Template()
     */
    public function deleteAction(Request $request) {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

        $isAjax = $request->isXmlHttpRequest();

        if ($isAjax) {
            $id = $request->request->get('id');
        } else {
            $id = $request->query->get('id');
        }
        if (!$id) {
            if (!$isAjax) {
                return $this->redirect()->toRoute('solmik');
            } else {
                return new Response(json_encode(array('message' => 'No id.', 'category' => $this->getRequest()->request->all())));
            }
        }

        if ($request->request->get('del')) {
            $del = $request->request->get('del');

            if ($del == 'Yes') {
                $this->em = $this->getDoctrine()->getManager();
                $this->em->remove($this->em->find('MkoxSolmikBundle:Category', $id));
                $this->em->flush();
                if ($isAjax) {
                    return new Response(json_encode(array('message' => 'Category deleted.', 'category' => $this->getRequest()->request->all())));
                }
            }
            if (!$isAjax) {
                return $this->redirectToRoute('solmik-start');
            }
        }

        if (!$isAjax) {
            return array(
                'id' => $id,
                'category' => $this->getDoctrine()->getRepository('MkoxSolmikBundle:Category')->find($id)
            );
        } else {
            return new Response(json_encode(array('message' => 'No deletion.', 'category' => $this->getRequest()->request->all())));
        }
    }

//    protected function attachDefaultListeners() {
//        parent::attachDefaultListeners();
//        $this->em = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
//    }
}
